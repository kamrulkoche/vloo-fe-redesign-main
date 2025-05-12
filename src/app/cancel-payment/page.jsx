"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const CancelPayment = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="flex w-80 flex-col items-center rounded-2xl bg-white p-6 shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 10 }}
            className="text-red-500"
          >
            <XCircle size={60} />
          </motion.div>
          <CardContent className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Payment Canceled!
            </h2>
            <Button className="mt-5" onClick={() => router.push("/")}>
              OK
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CancelPayment;
