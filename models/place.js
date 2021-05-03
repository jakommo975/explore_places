class Place {
    constructor(id, title, imageUri, address, lat, lng, userId=null, userName=null){
        this.id = id;
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.userId = userId;
        this.userName = userName;
    }
}

export default Place;