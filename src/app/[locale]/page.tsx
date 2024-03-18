'use client'

import Layout from "@/components/Layout";
import { useTheme } from "../../contexts/ThemeContext";

export default function Home() {
  const { toggleTheme } = useTheme();
  return (
    <Layout>
      <span>
        Homepage
      </span>
    </Layout>
  );
}
