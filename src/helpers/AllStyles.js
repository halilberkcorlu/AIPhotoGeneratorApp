import { StyleSheet,Platform,Dimensions } from "react-native";
export const { width: SCREEN_WIDTH } = Dimensions.get('window');

 const AllStyles = StyleSheet.create({
    homeContainer: {
      flexGrow: 1,
      backgroundColor: '#F9FAFC',
      alignItems: 'center', 
      paddingTop:50, 
      paddingBottom:20
    },
    logo: {
      backgroundColor:'white',
      width: 50,
      height: 50, 
      marginBottom: 10, 
    },
    item: {
      width: SCREEN_WIDTH - 80,
      height: SCREEN_WIDTH - 160,
      marginLeft:10
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), 
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 10,
      
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginHorizontal: 10,
    },
    promptLabel: {
  
      fontSize: 18,
      fontWeight: 'bold',
      marginHorizontal: 20,
      marginBottom:20
    },
    promptInput: {
      borderColor: '#F9FAFC',
      backgroundColor:'#EFEFEF',
      borderWidth: 2,
      borderRadius: 5,
      padding: 20,
      width:'80%',
      margin: 10,
      marginBottom:40,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 1,
      elevation: 5, 
      
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    flatList: {
      paddingHorizontal: 20,
    },
    categoryItem: {
      alignItems: 'center',
      marginRight: 10,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#fff',
      borderWidth:0,
      elevation: 3, 
      shadowColor: '#000', 
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      padding:8
    },
    selectedCategoryItem: {
      backgroundColor: '#F4A443',
    },
    categoryImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    categoryTitle: {
      marginTop: 5,
      fontSize: 16,
      fontWeight: 'bold',
    },
    selectedCategoryTitle: {
      color: '#fff',
    },
    createButton:{
      height:50,
      width:200,
      borderRadius:30,
      backgroundColor:'#F4A443',
      justifyContent:'center',
      alignItems:'center',
      margin:20,
      shadowColor: '#000', 
      shadowOffset: { width: 0, height:2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
  
    },
    createButtonText:{
      color:'white',
      fontWeight:'bold'
    },
    createButtonPressed: {
        backgroundColor: 'gray', 
      },
      outputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FAFC', // Örnek arka plan rengi
        paddingVertical: 50,
        paddingHorizontal: 20,
      },
    outputLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      alignItems:'center'

    },
    outputImage: {
      width: SCREEN_WIDTH - 40,
      height: SCREEN_WIDTH - 40,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      justifyContent:'center',
      alignItems:'center'
    },
    saveButton: {
      backgroundColor: '#ff6600', // Orange color
      height:50,
      width:200,
      justifyContent:'center',
      alignItems:'center',

      borderRadius: 10,
      margin:20
    },
    saveButtonText: {
      color: '#ffffff', // White text color
      fontSize: 16,
      fontWeight: 'bold',
    }
  
  });
  export default AllStyles