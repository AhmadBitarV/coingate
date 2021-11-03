import "styles/globals.scss";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import { theme } from "styles/theme";
import Layout from "components/layout";
import { useEffect } from "react";
import App from "next/app";
import type { AppProps, AppContext } from "next/app";

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

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
