'use client'

import Layout from "@/components/Layout";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    router.push('/chat');
  }, []);

  return (
    <Layout>
      <span>
        Homepage
      </span>
    </Layout>
  );
}
