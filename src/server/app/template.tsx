const bundlePath = process.env.NODE_ENV === 'production'
  ? '/client.js'
  : 'http://localhost:8000/client.js'

export const template = (markup: string, appData?: any): string => {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/style.css">
        <title>Is The Cricket On</title>
      </head>
      <body>
        <main id="container">${markup}</main>
        <script type="text/javascript">var appData = ${appData};</script>
        <script type="text/javascript" src="${bundlePath}"></script>
      </body>
    </html>
  `
}
