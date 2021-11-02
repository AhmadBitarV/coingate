import "styles/globals.scss";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import { theme } from "theme";
import Layout from "components/layout";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ThemeProvider>{" "}
    </>
  );
}

export default MyApp;
