const STORAGE_KEY = "la-sal-tierra-theme";

export function ThemeScript() {
  const script = `(function(){try{var k="${STORAGE_KEY}";var s=localStorage.getItem(k);var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s==="dark"||s==="light"?s:(d?"dark":"light");if(t==="dark")document.documentElement.classList.add("dark");}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
