import AsyncStorage from "@react-native-async-storage/async-storage"

class StorageService{
  constructor(key){
    this.key = key
  }

  async get(){
    try {
      const jsonValue = await AsyncStorage.getItem(this.key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log(error);
    }
  }

  async set(value){
    try {
      if(!value) return
      const data = await this.get()
      if(data){
        const newVal = { ...data, ...value}
        const jsonValue = JSON.stringify(newVal)
        await AsyncStorage.setItem(this.key, jsonValue);
        return
      } 
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(this.key, jsonValue);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(){
    try {
      await AsyncStorage.removeItem(this.key);
    } catch (error) {
      console.log(error);
    }
  }
}

export default StorageService