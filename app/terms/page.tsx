import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms — Zero to ₹0",
  description: "The terms for using Zero to ₹0 and the free AI course.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms and conditions" updated="23 November 2026">
      <p>
        By using Zero to ₹0 (zeroto.infinitylinkage.com), including the free AI course, you agree to these terms. If you
        don&apos;t agree, please don&apos;t use the site.
      </p>

      <h2>What this site is</h2>
      <p>
        A free, independent guide that selects and orders free learning material published by others, plus a parody of
        paid AI-course marketing. It doesn&apos;t sell anything, charge fees or require an account.
      </p>

      <h2>Lessons belong to their publishers</h2>
      <ul>
        <li>
          Every lesson is created, hosted and owned by its publisher and opens on their site. This site doesn&apos;t
          copy, host or control that material.
        </li>
        <li>
          Publishers can change, move, restrict or remove lessons at any time. Links are checked regularly, but some
          may break or go out of date between checks.
        </li>
        <li>
          Lessons are free to open, but some publishers ask you to create a free account, and some tools offer paid
          plans or features. Where a paid plan is needed, the lesson says so. Check costs on the publisher&apos;s site
          before you sign up for anything.
        </li>
        <li>Your use of each publisher&apos;s site is governed by that publisher&apos;s own terms.</li>
      </ul>

      <h2>No guarantees</h2>
      <p>
        The site is provided free and &quot;as is&quot;, for general learning only. It isn&apos;t professional, career,
        legal or financial advice, it doesn&apos;t issue certificates, and it can&apos;t promise any particular result.
        AI tools can produce wrong answers; check their output before relying on it, and don&apos;t share confidential
        or personal data with them.
      </p>
      <p>
        To the extent the law allows, Krutik Raut isn&apos;t liable for any loss arising from using this site or the
        third-party sites it links to.
      </p>

      <h2>Parody and trademarks</h2>
      <p>
        Parts of this site are an independent parody of paid-course marketing. It is not affiliated with or endorsed by
        Zero to Infinity with AI, its instructors, or any publisher or creator linked here, and the satire is not an
        allegation of misconduct by anyone.
      </p>
      <p>
        Product names and logos are trademarks of their owners and are used only to identify who made each lesson. Their
        use doesn&apos;t imply any endorsement.
      </p>

      <h2>Using the site fairly</h2>
      <p>
        Please don&apos;t try to disrupt the site, overload it, or inflate the visit counter with automated requests.
      </p>

      <h2>Open source</h2>
      <p>
        The site&apos;s code is published under the{" "}
        <a href="https://github.com/krutikkkkkkkkk/zero-to-0/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
          MIT License
        </a>
        , so you may reuse it under that license. The license covers this site&apos;s code and text, not the linked
        lessons or anyone&apos;s trademarks.
      </p>

      <h2>Sponsoring</h2>
      <p>
        Sponsoring through GitHub Sponsors is entirely optional and voluntary. It doesn&apos;t buy access to anything:
        the course stays free for everyone. Sponsorships are handled by GitHub under GitHub&apos;s terms.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may be updated from time to time. The date at the top shows the latest version, and continuing to use
        the site after a change means you accept the updated terms.
      </p>
    </LegalPage>
  );
}
