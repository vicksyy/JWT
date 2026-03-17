"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type HtmlTagsChartProps = {
  data: Array<{
    tag: string;
    value: number;
  }>;
};

const BAR_COLORS = [
  "#F0386B",
  "#FF5376",
  "#225560",
  "#FAF33E"
];

export function HtmlTagsChart({ data }: HtmlTagsChartProps) {
  return (
    <div className="mx-auto w-full max-w-[560px] min-w-[280px]">
      <ResponsiveContainer width="100%" height={380} minWidth={280}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
          barCategoryGap={10}
        >
          <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
          <XAxis
            type="number"
            stroke="rgba(255,255,255,0.42)"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis
            dataKey="tag"
            type="category"
            stroke="rgba(255,255,255,0.55)"
            tickLine={false}
            axisLine={false}
            width={52}
            fontSize={12}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            contentStyle={{
              background: "#171219",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "12px",
              color: "#ffffff"
            }}
            itemStyle={{ color: "#ffffff" }}
            formatter={(value) => [`${String(value)}%`, "Uso aproximado"]}
            labelStyle={{ color: "#FAF33E" }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.tag} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
