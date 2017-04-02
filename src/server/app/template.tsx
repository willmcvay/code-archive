export default (markup: string, bundlePath?: string, appData?: any): string => {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/public/style.css">
        <title>Is The Cricket On</title>
      </head>
      <body>
        <main id="container">${markup}</main>
        <script type="text/javascript">var appData = ${appData};</script>
        <script type="text/javascript" src="${bundlePath}"></script>
      </body>
    </html>
  `;
};