import type { PerformanceData } from "@/modules/ecommerce/edit-product/widgets/performance/types";

const performance: PerformanceData = {
  unitsSold: 412,
  revenue: {
    value: 53148,
    currency: "USD",
  },
  conversion: 3.8,
  averageRating: 4.7,
};

export async function GET() {
  return Response.json(performance);
}
