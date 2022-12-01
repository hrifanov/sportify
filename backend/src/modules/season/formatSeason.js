export default (season) => {
    return {
        id: season._id,
        name: season.name,
        club: season.club,
    }
}
