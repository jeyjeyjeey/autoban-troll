export type comment = {
    id: string,
    snippet: snippet,
    authorDetails: authorDetails,
    annotation?: annotation
}

type snippet = {
    type: string,
    displayMessage: string
}

type authorDetails = {
    channelId: string
    displayName: string
    profileImageUrl: string
    isVerified: boolean
    isChatOwner: boolean
    isChatSponsor: boolean
    isChatModerator: boolean
}

export type annotation = {
    isSlander: boolean
    isInstruction: boolean
    isAutonomy: boolean
}

export const annotationDefault: annotation = {
    isSlander: false,
    isInstruction: false,
    isAutonomy: false
  }
