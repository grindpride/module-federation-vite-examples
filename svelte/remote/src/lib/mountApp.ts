import { mount } from "svelte";
import Page from "../routes/+page.svelte";

export function mountApp(target: HTMLElement) {
  return mount(Page, { target });
}
