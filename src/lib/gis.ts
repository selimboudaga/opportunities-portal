// src/lib/gis.ts
// Access to AIESEC's GIS GraphQL API.
import { request, gql } from "graphql-request";

// NOTE: this token ships in the client bundle, so anyone who opens the site can
// read it. Move it behind a proxy that keeps it server-side before launch.
const ENDPOINT =
  "https://gis-api.aiesec.org/graphql?access_token=zz2_PAG4cOJn6cSYHg0vYDFNz6pVQKsmiXhqaPUapjw";

/** Only opportunities created on or after this date are listed. */
const CREATED_FROM = "2026-01-01";

export interface Opportunity {
  id: string;
  title: string | null;
  organisation: { name: string } | null;
  created_at: string;
  openings: number | null;
  opportunity_duration_type: { id: string; duration_type: string } | null;
  specifics_info: { salary: number | null } | null;
}

interface OpportunitiesResponse {
  opportunities: { data: Opportunity[] | null };
}

const opportunitiesQuery = (programmeId: number) => gql`
  query getOpportunities($startDate: String!) {
    opportunities(
      filters: {
        created: { from: $startDate }
        programmes: ${programmeId}
        status: "open"
      }
      per_page: 1000
    ) {
      data {
        id
        title
        organisation {
          name
        }
        created_at
        openings
        opportunity_duration_type {
          id
          duration_type
        }
        specifics_info {
          salary
        }
      }
    }
  }
`;

/**
 * Fetches the open opportunities for one programme, newest range starting at
 * CREATED_FROM. Programme IDs: 7 = Global Volunteer, 8 = Global Talent,
 * 9 = Global Teacher.
 */
export async function fetchOpportunities(
  programmeId: number
): Promise<Opportunity[]> {
  const data = await request<OpportunitiesResponse>(
    ENDPOINT,
    opportunitiesQuery(programmeId),
    { startDate: CREATED_FROM }
  );

  return data.opportunities.data ?? [];
}
