

export default class DataContext {

    constructor (data) {
        this._data = data;
    }

    get data() {
        return this.data;
    }
    set data(data){
        this._data=data;
    }

}