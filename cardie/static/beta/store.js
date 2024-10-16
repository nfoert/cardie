import { reactive, watchEffect } from "vue";

/**
 * @typedef LinkItem
 * @type {object}
 * @property {"url"} type
 * @property {string} url
 * @property {string} text
 */

/**
 * @typedef TextItem
 * @type {object}
 * @property {"text"} type
 * @property {string} text
 */

/**
 * @typedef Item
 * @type {object}
 * @property {string} id
 * @property {LinkItem | TextItem} value
 * @property {string} icon
 */

/**
 * @typedef Store
 * @type {object}
 * @property {object} card
 * @property {object} card.styles
 * @property {string} card.styles.fontFamily
 * @property {object} card.colors
 * @property {string} card.colors.background
 * @property {string} card.colors.accent
 * @property {string} card.colors.text
 * @property {object} card.front
 * @property {string} card.front.title
 * @property {string} card.front.subTitle
 * @property {"left" | "center" | "right"} card.front.align
 * @property {Item[]} card.items
 * @property {(layout: "left" | "center" | "right") => void} changeLayout
 * @property {(item: Item) => void} addItem
 * @property {(id: string) => void} deleteItem
 * @property {(id: string, value: LinkItem | TextItem) => void} updateItem
 */

/**
 * @return {Store}
 */
const defaultData = {
	card: {
		styles: {
			fontFamily: "Noto Sans",
		},
		colors: {
			background: "#fff",
			accent: "#000",
			text: "#f0f",
		},
		front: {
			title: "Card Title",
			subTitle: "Card Subtitle",
			align: "center",
		},
		items: [
			{
				id: "cae2d2af-240e-46d7-b89c-ec84e28eb1a3",
				value: {
					text: "Hello, World!",
					type: "text",
				},

				icon: "ph-globe",
			},
			{
				id: "348cf352-40cc-4138-afbb-b90b4082c4d4",
				value: {
					text: "My personal website!",
					url: "https://example.com",
					type: "url",
				},
				icon: "ph-globe",
			},
		],
	},
};
function storeFactory() {
	const localRawData = localStorage.getItem("store");
	console.log("store ");

	const data = JSON.parse(localRawData || "") ?? defaultData;
	return {
		...data,
		changeLayout(layout) {
			this.card.front.align = layout;
		},
		addItem() {
			this.card.items.push({
				icon: "ph-globe",
				id: Math.random().toString(36).substr(2, 9),
				value: {
					text: "New item",
					type: "text",
				},
			});
		},
		deleteItem(id) {
			this.card.items = this.card.items.filter((item) => item.id !== id);
		},
		updateItem(id, value) {
			this.card.items = this.card.items.map((item) => {
				if (item.id === id) {
					item.value = value;
				}
				return item;
			});
		},
	};
}

export const store = reactive(storeFactory());

watchEffect(() => {
	localStorage.setItem("store", JSON.stringify(store));
});
