<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Laravel + Vite App</title>
  </head>
  <body class="font-sans">
    <div id="root"></div>

    @if(config('app.env') === 'production')
      @vite
    @else
      <script type="module">
        import RefreshRuntime from "{{ env('VITE_SERVER_HOST', 'http://localhost:3000') }}/@@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
      </script>

      <script type="module" src="{{ env('VITE_SERVER_HOST', 'http://localhost:3000') }}/@@vite/client"></script>
      <script type="module" src="{{ env('VITE_SERVER_HOST', 'http://localhost:3000') }}/resources/js/main.jsx"></script>
    @endif

  </body>
</html>
