<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <title>Alspace</title>
  <link rel="manifest" href="/manifest.json">
  @if (config('app.env') === 'local')
  <script type="module">
    import RefreshRuntime from "{{ env('DEV_SERVER_URL', 'http://localhost:3000') }}/@@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
  </script>
  @endif

  <script>
    window.user = @json($user);
    window.payload = @json($payload);
  </script>

  <!-- Scripts and CSS import -->
  @vite
</head>

<body class="font-sans">
  <div id="root"></div>
</body>

</html>