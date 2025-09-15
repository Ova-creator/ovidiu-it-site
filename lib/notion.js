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
export function mapProject(page) {
  const props = page?.properties || {};

  // Title — adună toate bucățile
  const titleProp = Object.entries(props).find(([, v]) => v?.type === "title");
  const title =
    titleProp?.[1]?.title?.map((t) => t.plain_text).join("") || "Untitled";

  // Summary — prima coloană rich_text
  const summary = (firstPropByType(props, "rich_text")?.rich_text || [])
    .map((t) => t.plain_text)
    .join("");

  // URL — prima coloană url
  const url = firstPropByType(props, "url")?.url || null;

  // Tags — primul multi_select → array
  const tags = (firstPropByType(props, "multi_select")?.multi_select || []).map(
    (t) => t.name
  );

  // Status — status (nou) sau select (vechi)
  const status =
    firstPropByType(props, "status")?.status?.name ||
    firstPropByType(props, "select")?.select?.name ||
    null;

  // Featured — checkbox/select “Featured” sau prima coloană checkbox (fallback)
  const featuredExplicit =
    props.Featured?.type === "checkbox" ? !!props.Featured.checkbox : null;
  const featuredSelect =
    props.Featured?.type === "select"
      ? (props.Featured.select?.name || "").toLowerCase() === "featured"
      : false;
  const featuredFallback = !!(firstPropByType(props, "checkbox")?.checkbox || false);
  const featured = featuredExplicit ?? featuredSelect ?? featuredFallback;

  // Date — prima coloană date sau created_time
  const date =
    firstPropByType(props, "date")?.date?.start ||
    page?.created_time ||
    null;

  // Cover — 1) property "Cover" (Files & media), 2) page.cover (fallback)
  let cover = null;

  // 1) Files & media property (prefer extern → file)
  const files = props.Cover?.files || [];
  if (files.length) {
    const f = files[0];
    cover = f?.external?.url || f?.file?.url || null;
  }

  // 2) Fallback: Notion page cover
  if (!cover && page?.cover) {
    cover = page.cover.external?.url || page.cover.file?.url || null;
  }

  const lastEdited = page?.last_edited_time || null;

  return {
    id: page?.id,
    title,
    summary,
    url,
    tags,
    status,
    featured,
    date,
    lastEdited,
    cover,
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
