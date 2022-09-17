export type comment = {
    id: string,
    snippet: snippet,
    authorDetails: authorDetails,
    annotation?: annotation
}

type snippet = {
    messageText: string
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

export const jsonData = [
    {
        "id": "LCC.CjgKDQoLQjBaTWR5SWxoSjQqJwoYVUNMTzlRRHhWTDRibnZSUnN6Nks0YnNREgtCMFpNZHlJbGhKNBI6ChpDSWVhbkpXNXRfa0NGV3NWclFZZEptNExqdxIcQ09xYmo4Q3p0X2tDRlQ5STlRVWRiOUlDTlExMw",
        "snippet": {
                "messageText": "フラグ立てないでえええ:_ちーもじなきちー::_ちーもじKusa:"
        },
        "authorDetails": {
            "channelId": "UCF1LK5-hQMT50mOh_t6d6tw",
            "displayName": "わさび餅",
            "profileImageUrl": "https://yt3.ggpht.com/8ha5rgkWL5e-FDeuIPuA3n3dggRPtBOhfw1frVTNTS3RayBym9b2kHsseUcGE8bkoIhSxUtsaQ=s88-c-k-c0x00ffffff-no-rj",
            "isVerified": false,
            "isChatOwner": false,
            "isChatSponsor": true,
            "isChatModerator": false
        }
    },
    {
        "id": "LCC.CjgKDQoLQjBaTWR5SWxoSjQqJwoYVUNMTzlRRHhWTDRibnZSUnN6Nks0YnNREgtCMFpNZHlJbGhKNBI6ChpDSWVhbkpXNXRfa0NGV3NWclFZZEptNExqdxIcQ09xYmo4Q3p0X2tDRlQ5STlRVWRiOUlDTlExMwTIGAUID",
        "snippet": {
                "messageText": "フラグ立てないでえええ:_ちーもじなきちー::_ちーもじKusa:"
        },
        "authorDetails": {
            "channelId": "UCF1LK5-hQMT50mOh_t6d6tw",
            "displayName": "わさび餅",
            "profileImageUrl": "https://yt3.ggpht.com/8ha5rgkWL5e-FDeuIPuA3n3dggRPtBOhfw1frVTNTS3RayBym9b2kHsseUcGE8bkoIhSxUtsaQ=s88-c-k-c0x00ffffff-no-rj",
            "isVerified": false,
            "isChatOwner": false,
            "isChatSponsor": true,
            "isChatModerator": true
        }
    }
]    
