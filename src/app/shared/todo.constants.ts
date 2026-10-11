// Original dev setup: Angular on :4200, API on localhost:3000.
// Otherwise (e.g. sandbox preview) the API is reached on the page's own origin via the dev-server proxy.
export const DOMAIN = window.location.port === "4200" ? "http://localhost:3000" : window.location.origin;

export const TODO_CHANGE_EVENT = "todo-change";
