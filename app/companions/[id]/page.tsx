import CompanionComponent from "@/components/CompanionComponent";
import {
  getCompanion,
  newSessionPermission,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";
interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const { name, subject, topic, duration } = companion;
  const user = await currentUser();
  if (!user){
    toast.error("You must be logged in to create a companion");
    return redirect("/sign-in")
  } ;
  
  if (!companion) return redirect("/companions");
  const canCreateSession = await newSessionPermission();
  return (
    <main>
      {canCreateSession ? (
        <>
          <article className="flex rounded-border justify-between p-6 max-md:flex-col">
            <div className="flex items-center gap-2">
              <div
                className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                style={{ backgroundColor: getSubjectColor(subject) }}
              >
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={name}
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-2xl">{name}</p>
                  <div className="subject-badge max-sm:hidden">{subject}</div>
                </div>
                <p className="text-lg ">{topic}</p>
              </div>
            </div>
            <div className="items-center text-2xl max-md:hidden">
              {duration} minutes
            </div>
          </article>
          <CompanionComponent
            {...companion}
            companionId={id}
            userName={user.firstName}
            userImage={user.imageUrl}
          />
        </>
      ) : (
        <article className="companion-limit">
          <Image
            src="/images/limit.svg"
            alt="companion limit reached"
            width={360}
            height={230}
          />
          <div className="cta-badge">Upgrade your plan</div>
          <h1>You&apos;ve reached the limit of companions</h1>
          <p>
            You have reached the limit of companions you can create. Please
            upgrade your plan to create more companions and premium features.
          </p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default CompanionSession;
