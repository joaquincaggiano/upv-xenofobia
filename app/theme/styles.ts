import { palette, paletteApp } from "./palette"
import { spacing } from "./spacing"

export const getAppStyle = (): AppStyle => light

type AppStyleType = typeof light
export interface AppStyle extends AppStyleType {}

const common = {
  text: {
    poppins: {
      regular: {
        fontFamily: "Poppins-Regular",
      },
      medium: {
        fontFamily: "Poppins-Medium",
      }
    },
  },
  textVariations: {
    textXS: {
      fontSize: 11.75,
    },
    textS: {
      fontSize: 13.75,
    },
    textM: {
      fontSize: 15.5,
    },
    textL: {
      fontSize: 16.75,
    },
    textXL: {
      fontSize: 18.5,
    },
    textXXL: {
      fontSize: 23,
    },
    textXXXL: {
      fontSize: 28.5,
    }
  },
  textColors: {
    textBlue: {
      color: paletteApp.blue
    },
    textOrange: {
      color: paletteApp.orange
    },
    textWhite: {
      color: paletteApp.white
    },
    textGreen: {
      color: paletteApp.green
    },
    textRed: {
      color: paletteApp.redDark
    },
    textBlack30: {
      color: paletteApp.black30
    },
    textOcre: {
      color: paletteApp.ocre
    },
  }
}

export const light = {
  darkMode: false,
  screen: {
    backgroundColor: palette.white,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.large
  },
  mainTextColor: {
    color: palette.black,
  },
  secondaryTextColor: {
    color: palette.white,
  },
  ...common.text,
  ...common.textVariations,
  ...common.textColors,
  mainColor: palette.white,
  secondaryColor: palette.darkGrey,
}