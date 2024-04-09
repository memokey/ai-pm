import { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { redirect } from "next/navigation";
import {
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";

export const DepositButton = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isDepositing, setIsDepositing] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleDeposit = useCallback(async () => {
    if (!publicKey) return;

    setIsDepositing(true);

    try {
      const totalPrice = LAMPORTS_PER_SOL * quantity;
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(
            "AiUxTwbrgwCGso8onoKpMMGXKASTdLCeWZddjYFFuaJD"
          ),
          lamports: totalPrice,
        })
      );
      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });

      // Update the leaderboard in the database
    } catch (error) {
      console.error("Failed to join Stacks", error);
      alert("An error occurred while joining Stacks. Please try again.");
    }

    setIsDepositing(false);
  }, [publicKey, sendTransaction, connection, quantity]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (!publicKey) {
    return (
      <div className="">
        <WalletMultiButton>Connect Wallet</WalletMultiButton>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center">
        <button
          disabled={isDepositing}
          onClick={handleDeposit}
          className="px-10 py-2 rounded bg-primary text-base-content font-bold"
        >
          {" "}
          Approve{" "}
        </button>
      </div>
    </div>
  );
};
