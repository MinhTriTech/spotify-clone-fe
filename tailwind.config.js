/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                spotifyGreen: "#1db954",
                spotifyGray: "#b3b3b3",
                spotifyLightBlack: "#222222",
            },
            fontFamily: {
                spotifyTitle: ["SpotifyMixUITitle", "sans-serif"],
                spotifyTitleBold: ["SpotifyMixUITitleBold", "sans-serif"],
                spotifyTitleExBold: ["SpotifyMixUITitleExBold", "sans-serif"],
                spotify: ["SpotifyMixUI", "sans-serif"],
                spotifyBold: ["SpotifyMixUIBold", "sans-serif"],
            },
        },
    },
    plugins: [],
};
