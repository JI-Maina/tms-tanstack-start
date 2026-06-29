import { StyleSheet, Text, View } from '@react-pdf/renderer'

interface PlayerStatsTableProps {
  stats: Array<{ [key: string]: string | number }>;
  col: string;
}

export const PlayerStatsTable = ({ stats, col }: PlayerStatsTableProps) => {
  const attackingColumns = [
    { key: "Player name", header: " ", width: "name" as const },
    { key: "rating", header: "Rating", width: "stat" as const },
    { key: "mins", header: "Mins", width: "stat" as const },
    { key: "goal", header: "Goal", width: "stat" as const },
    { key: "assist", header: "Assist", width: "stat" as const },
    {
      key: "Shots / on target",
      header: "Shots / on target",
      width: "stat" as const,
    },
    {
      key: "Crosses / accurate",
      header: "Cross / accurate",
      width: "stat" as const,
    },
    { key: "Box touch", header: "Box touch", width: "stat" as const },
    { key: "Box carry", header: "Box carry", width: "stat" as const },
    { key: "chances", header: "Chance", width: "stat" as const },
    {
      key: "Passes / complete",
      header: "Pass / accurate",
      width: "stat" as const,
    },
    {
      key: "Progress Passes / complete",
      header: "Prog pass / accurate",
      width: "stat" as const,
    },
  ];

  const defensiveColumns = [
    { key: "Player name", header: " ", width: "name" as const },
    { key: "rating", header: "Rating", width: "stat" as const },
    { key: "mins", header: "Mins", width: "stat" as const },
    { key: "Blocks", header: "Blocks", width: "stat" as const },
    { key: "Clearance", header: "Clearance", width: "stat" as const },
    {
      key: "Interception own / opp",
      header: "Interception own / opp",
      width: "stat" as const,
    },
    {
      key: "Ball won / lost",
      header: "Ball won / lost",
      width: "stat" as const,
    },
    { key: "Second ball", header: "Second ball", width: "stat" as const },
    {
      key: "Tackles / won",
      header: "Tackles / won",
      width: "stat" as const,
    },
    {
      key: "Aerial duels / won",
      header: "Aerial duels / won",
      width: "stat" as const,
    },
    {
      key: "Foul won / comm",
      header: "Foul won / comm",
      width: "stat" as const,
    },
    {
      key: "Card yellow / red",
      header: "Card yellow / red",
      width: "stat" as const,
    },
  ];

  const goalkeepingColumns = [
    { key: "Player name", header: " ", width: "name" as const },
    { key: "rating", header: "Rating", width: "stat" as const },
    { key: "Saves", header: "Saves", width: "stat" as const },
    {
      key: "Claims / successful",
      header: "Claims / successful",
      width: "stat" as const,
    },
    {
      key: "Distribution",
      header: "Distribution",
      width: "stat" as const,
    },
    {
      key: "Goal kicks / complete",
      header: "Goal kicks / complete",
      width: "stat" as const,
    },
    {
      key: "Kick-outs / complete",
      header: "Kick-outs / complete",
      width: "stat" as const,
    },
    {
      key: "Throw-outs / complete",
      header: "Throw-outs / complete",
      width: "stat" as const,
    },
    {
      key: "Run-outs / successful",
      header: "Run-outs / successful",
      width: "stat" as const,
    },
  ];

  const columns =
    col === "attacking"
      ? attackingColumns
      : col === "defensive"
      ? defensiveColumns
      : goalkeepingColumns;

  return (
    <View style={styles.playerStatsTable}>
      {/* Table Header */}
      <View style={styles.playerTableHeader}>
        {columns.map((column, index) => (
          <Text
            key={index}
            style={[
              styles.playerTableHeaderCell,
              column.width === "name"
                ? styles.playerNameCol
                : styles.playerStatCol,
            ]}
          >
            {column.header}
          </Text>
        ))}
      </View>
      {/* Table Rows */}
      {stats.map((player, index) => (
        <View key={index} style={styles.playerTableRow}>
          {columns.map((column, colIndex) => (
            <Text
              key={colIndex}
              style={[
                styles.playerTableCell,
                column.width === "name"
                  ? styles.playerNameCol
                  : styles.playerStatCol,
              ]}
            >
              {(() => {
                const value = player[column.key];
                if (column.key === "rating" && typeof value === "number") {
                  return value.toFixed(1);
                }
                return String(value || "-");
              })()}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  playerStatsTable: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 4,
    overflow: "hidden",
    flex: 1,
  },
  playerTableHeader: {
    flexDirection: "row",
    backgroundColor: "#1e40af",
    borderBottomWidth: 2,
    borderBottomColor: "#1e3a8a",
  },
  playerTableHeaderCell: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#ffffff",
    paddingVertical: 4,
    paddingHorizontal: 3,
    textAlign: "center",
  },
  playerTableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#ffffff",
  },
  playerTableCell: {
    fontSize: 6,
    color: "#1e293b",
    paddingVertical: 3,
    paddingHorizontal: 3,
    textAlign: "left",
  },
  // Column widths for player table
  playerNameCol: {
    width: "12%",
    fontWeight: "bold",
  },
  playerStatCol: {
    width: "8.8%",
    textAlign: "center",
  },
});
