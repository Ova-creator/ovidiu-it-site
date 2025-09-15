// lib/notion.js — Notion REST (fără SDK), robust & tolerant la coloane lipsă

const apiKey = process.env.NOTION_API_KEY || "";
const rawDb = process.env.NOTION_DATABASE_ID || "";

/** Acceptă ID simplu (32 hex), UUID cu liniuțe sau URL către database.
 *  Returnează UUID cu liniuțe (formatul cerut de Notion API). */
function normalizeDatabaseId(input) {
  if (!input) return "";
  const m = input
    .trim()
    .match(
      /([0-9a-fA-F]{32}|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/
    );
  const id = m ? m[1] : "";
  if (!id) return "";
  if (/^[0-9a-fA-F]{32}$/.test(id)) {
    return [
      id.slice(0, 8),
      id.slice(8, 12),
      id.slice(12, 16),
      id.slice(16, 20),
      id.slice(20),
    ].join("-");
  }
  return id;
}

const dbId = normalizeDatabaseId(rawDb);

export function notionConfigured() {
  return Boolean(apiKey && dbId);
}

async function notionQueryDatabase({ databaseId, body = {} }) {
  if (!apiKey) {
    throw new Error("Missing NOTION_API_KEY. Add it in .env.local then restart dev server.");
  }
  if (!databaseId) {
    throw new Error("Invalid NOTION_DATABASE_ID. Paste the Database ID or its URL.");
  }

  const res = await fetch(
    `https://api.notion.com/v1/databases/${encodeURIComponent(databaseId)}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`Notion ${res.status}: ${err}`);
  }
  return res.json();
}

/** Helper generic: prima proprietate după type */
function firstPropByType(pageProps, type) {
  const entry = Object.entries(pageProps || {}).find(([, v]) => v?.type === type);
  return entry ? entry[1] : null;
}

/** Normalizează un row Notion → obiect unificat pentru UI */
// lib/notion.js
// === în lib/notion.js ===
// Funcție de mapare sigură pentru un "project" din Notion.
// lib/notion.js — funcția mapProject (versiunea finală, sigură)
function mapProject(page) {
  let cover = null;

  // 1) Cover din proprietatea "Cover" (Files & media)
  const propCover = page?.properties?.Cover;
  if (propCover?.files?.length > 0) {
    const f = propCover.files[0];
    cover = f?.external?.url || f?.file?.url || null;
  }

  // 2) Fallback: page.cover (Notion page cover)
  if (!cover && page?.cover) {
    cover = page.cover.external?.url || page.cover.file?.url || null;
  }

  // 3) Evită page-covers servite de www.notion.so (dau 400 în loader uneori)
  if (cover && cover.includes("www.notion.so")) {
    cover = null;
  }

  return {
    id: page?.id,
    title: page?.properties?.Name?.title?.[0]?.plain_text || "Untitled",
    summary: page?.properties?.Summary?.rich_text?.[0]?.plain_text || "",
    url: page?.properties?.URL?.url || null,
    status:
      page?.properties?.Status?.status?.name ||
      page?.properties?.Status?.select?.name ||
      "",
    date: page?.properties?.Date?.date?.start || null,
    tags: Array.isArray(page?.properties?.Tags?.multi_select)
      ? page.properties.Tags.multi_select.map((t) => t.name)
      : [],
    featured:
      !!page?.properties?.Featured?.checkbox ||
      page?.properties?.Featured?.select?.name === "Featured" ||
      false,
    cover, // poate rămâne null → cardul folosește placeholder >_
  };
}




/** Toate proiectele (sort desc după Date; fallback last_edited_time) */
export async function getProjects(limit = 100) {
  if (!notionConfigured()) return [];
  let data;

  try {
    data = await notionQueryDatabase({
      databaseId: dbId,
      body: {
        sorts: [{ property: "Date", direction: "descending" }],
        page_size: limit,
      },
    });
  } catch {
    data = await notionQueryDatabase({
      databaseId: dbId,
      body: {
        sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
        page_size: limit,
      },
    });
  }

  const results = Array.isArray(data.results) ? data.results : [];
  return results.map(mapProject);
}

/** Doar Featured — tolerant: NU mai folosim filter server-side ca să evităm 400
 *  când lipsește coloana “Featured”. Luăm bulk și filtrăm local după mapProject(). */
// lib/notion.js (înlocuiește doar această funcție)
export async function getFeaturedProjects(limit = 3) {
  if (!notionConfigured()) return [];
  let data;

  try {
    data = await notionQueryDatabase({
      databaseId: dbId,
      body: {
        sorts: [{ property: "Date", direction: "descending" }],
        page_size: 100,
      },
    });
  } catch {
    data = await notionQueryDatabase({
      databaseId: dbId,
      body: {
        sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
        page_size: 100,
      },
    });
  }

  const results = Array.isArray(data.results) ? data.results : [];
  const mapped = results.map(mapProject);

  // 1) filtrează pe featured (checkbox/select sau primul checkbox din DB)
  let onlyFeatured = mapped.filter((p) => p.featured === true);

  // 2) fallback: dacă nu există nimic marcat, ia cele mai recente 3
  if (onlyFeatured.length === 0) {
    onlyFeatured = mapped.slice(0, limit);
  }

  return onlyFeatured.slice(0, limit);
}


/** BACK-COMPAT: API vechi folosit deja pe /projects */
export async function fetchProjectsFromNotion() {
  if (!notionConfigured()) return [];
  let data;

  try {
    data = await notionQueryDatabase({
      databaseId: dbId,
      body: {
        sorts: [{ property: "Featured", direction: "descending" }],
        page_size: 50,
      },
    });
  } catch {
    data = await notionQueryDatabase({
      databaseId: dbId,
      body: {
        sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
        page_size: 50,
      },
    });
  }

  const results = Array.isArray(data.results) ? data.results : [];
  return results.map(mapProject);
}
