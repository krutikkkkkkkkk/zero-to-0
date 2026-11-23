import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy — Zero to ₹0",
  description: "What Zero to ₹0 stores, where, and why. No accounts, no cookies, no trackers.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="24 November 2026">
      <p>
        Zero to ₹0 and the free AI course are run by Krutik Raut. The short version: there are no accounts, no forms, no
        cookies, no ads and no third-party analytics or tracking scripts. Here is everything the site does with data.
      </p>

      <h2>What stays in your browser</h2>
      <p>These are saved on your own device and are never sent to us:</p>
      <ul>
        <li>
          <strong>Course progress</strong>: the lessons and projects you tick on the free AI course (stored as{" "}
          <code>free-ai-course-done</code> in your browser&apos;s local storage).
        </li>
        <li>
          <strong>Your path</strong>: your three answers to &ldquo;Find your path&rdquo; (<code>zero-path</code>), used
          only to pick which lessons to show you.
        </li>
        <li>
          <strong>Practice tasks</strong>: the tasks you mark done on the home page (<code>zero-practice</code>).
        </li>
        <li>
          <strong>A visit marker</strong>: a note that this browser session has already been counted (
          <code>zero-to-0-visit-counted</code>, in session storage, deleted when you close the tab).
        </li>
      </ul>
      <p>You can remove all of these at any time by clearing this site&apos;s data in your browser settings.</p>

      <h2>Progress links and progress cards</h2>
      <p>
        <strong>Progress links</strong> carry your ticked lessons (as short codes) and your path answers in the part of
        the link after the <code>#</code>. Browsers don&apos;t send that part to any server, so we never see it. Anyone you
        give the link to can see which lessons you finished, so share it only with yourself or people you trust.
      </p>
      <p>
        <strong>Progress cards</strong> are drawn by our server from three numbers: lessons done, projects done and the
        last module you finished. Nothing else is sent, and the image isn&apos;t stored. It&apos;s self-reported and is
        not a certificate.
      </p>

      <h2>The visit counter</h2>
      <p>
        Once per browser session, the page asks our server to add one to a single running total, which is shown in the
        footer. Only that number is stored (in an Upstash Redis database). No IP address, device identifier or other
        information about you is saved with it.
      </p>

      <h2>Hosting</h2>
      <p>
        The site is hosted on Vercel. Like any web host, Vercel processes technical information such as your IP address
        and browser type to deliver pages and protect the service from abuse. That is handled under{" "}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          Vercel&apos;s privacy policy
        </a>
        . We don&apos;t use it to identify or profile visitors.
      </p>
      <p>Fonts are served from this site, so loading a page makes no requests to Google or other font services.</p>

      <h2>Links to other sites</h2>
      <p>
        Every lesson opens on its publisher&apos;s own website, such as Anthropic, OpenAI, Google, YouTube or Figma.
        Those sites have their own privacy policies, cookies and accounts, which this site does not control.
      </p>

      <h2>Sponsoring</h2>
      <p>
        Sponsoring is optional and happens entirely on GitHub Sponsors. GitHub handles any payment details under its own
        privacy statement; this site never sees them.
      </p>

      <h2>Changes</h2>
      <p>
        If what the site stores ever changes, this page will be updated first and the date at the top will change. The
        site&apos;s source code is public, so you can also check exactly what it does.
      </p>
    </LegalPage>
  );
}
