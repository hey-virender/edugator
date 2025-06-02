"use client";
import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";
interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmark: boolean;
}
const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmark,
}: CompanionCardProps) => {
  const pathName = usePathname();
  const handleBookmark = async () => {
    if (bookmark) {
      await removeBookmark(id, pathName);
      toast.success("Removed from bookmarks");
    } else {
      await addBookmark(id, pathName);
      toast.success("Added to bookmarks");
    }
  };
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={
              bookmark ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm line-clamp-1">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src={"/icons/clock.svg"}
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>
      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
