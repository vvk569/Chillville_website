import type { Metadata } from "next";
import { OrderClient } from "@/components/order/OrderClient";

export const metadata: Metadata = {
  title: "Order for Pickup",
  description:
    "Order Chillville treats for pickup — choose your boba, cookies, donuts and more, pick a time, and pay in store when you collect.",
};

export default function OrderPage() {
  return <OrderClient />;
}
