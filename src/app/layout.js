import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { gql } from "@apollo/client";
import { client } from "../lib/client";

const GET_MENU_QUERY = gql`
  query GetMenu {
    platforms {
      nodes {
        name
        slug
        platformDetails {
          platformImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export const metadata = {
  title: "Retro Wizard",
  description: "A curated database of 16-bit classics.",
};

export default async function RootLayout({ children }) {
  const { data } = await client.query({
    query: GET_MENU_QUERY,
    fetchPolicy: "no-cache"
  });

  const platforms = data?.platforms?.nodes || [];

  return (
    <html lang="en">
      <body className="flex flex-col font-sans min-h-screen antialiased selection:bg-cyan-500/30">

        {/* HEADER SECTION */}
        <Header platforms={platforms} />

        {/* Spacer for fixed header */}
        <div className="h-20 md:h-24 lg:h-28"></div>

        {/* MAIN CONTENT */}
        <div className="flex-grow relative z-10">
          {children}
        </div>

        {/* FOOTER */}
        <Footer />
        
      </body>
    </html>
  );
}