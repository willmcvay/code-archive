export default ( markup: JSX.Element, bundlePath: string, appData: any ): string => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Is The Cricket On</title>
        <link rel="stylesheet" type="text/css" href="/client/css/style.css">
      </head>
      <body>
        <main id="container">
          ${ markup }
        </main>
        <script type="text/javascript">var appData = ${ appData };</script>
        <script type="text/javascript" src="${ bundlePath }"></script>
      </body>
    </html>
  `;
};
