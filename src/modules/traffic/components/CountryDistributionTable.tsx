import {
  formatCompactNumber,
  formatDurationSeconds,
  getCountryFlag,
} from "../../../utils";
import type { CountryDistributionTableProps } from "../types";
import { countryTableStyles } from "../styles";

export function CountryDistributionTable({
  countries,
  searchQuery,
}: CountryDistributionTableProps) {
  return (
    <div className="card" style={countryTableStyles.card}>
      <div style={countryTableStyles.header}>
        <h3 style={countryTableStyles.headerTitle}>
          Geographic Distribution (Countries)
        </h3>
      </div>
      <div className="twrap">
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Visitors</th>
              <th>Conversions</th>
              <th>Avg. Session Duration</th>
            </tr>
          </thead>
          <tbody>
            {countries.length > 0 ? (
              countries.map((row, i) => (
                <tr key={i}>
                  <td style={countryTableStyles.countryCell}>
                    <span style={countryTableStyles.countryFlag}>
                      {getCountryFlag(row.country)}
                    </span>
                    {row.country}
                  </td>
                  <td>{formatCompactNumber(row.visitors)}</td>
                  <td>
                    <span className="tag t-green">
                      {formatCompactNumber(row.conversions)}
                    </span>
                  </td>
                  <td>{formatDurationSeconds(row.averageSession)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={countryTableStyles.emptyCell}>
                  {searchQuery
                    ? `No countries found matching "${searchQuery}".`
                    : "No country data available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
