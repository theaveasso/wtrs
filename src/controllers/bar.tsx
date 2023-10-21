export function bar(body) {
  return <div>{body.username}</div>;
}

export function getRoot() {
  return (
    <html>
      <script
        src="https://unpkg.com/htmx.org@1.9.6"
        integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni"
        crossorigin="anonymous"
      ></script>
      <head>
        <title>My Simple HTML5 Page</title>
      </head>
      <body>
        <h1>Welcome to My Simple HTML5 Page</h1>
        <p>This is a basic HTML5 document.</p>
        <button hx-post="/clicked" hx-swap="outerHtml">
          Click me!
        </button>
      </body>
    </html>
  );
}

export function poopForm() {}

// export function click() {
//   throw "Fuck off";
