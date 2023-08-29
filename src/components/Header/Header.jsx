import { Text, TouchableOpacity, View, StyleSheet } from "react-native"

const OPTIONS = ['Pomodoro', 'Short Break', 'Long Break']
const Header = ({setTime, currentTime, setCurrentTime}) => {
    const handlePress = (index) => {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index)
        setTime(newTime * 60)
    }

    return(
        <View style={styles.container}>
            {OPTIONS.map((item, index) => {
                return(
                    <TouchableOpacity
                        style={[styles.itemStyle, currentTime !== index && {borderColor:'transparent'}]}
                        onPress={() => handlePress(index)}
                    >
                            <Text
                            style={styles.text}
                            key={index}
                            >{item}</Text>
                    </TouchableOpacity>

                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        
    },
    itemStyle:{

        borderWidth:3,
        width:'33%',
        padding:5,
        borderRadius:10,
        borderColor:'white',
       
        marginVertical:20,
        
    },
    text:{
        textAlign: 'center',    
        fontSize:20,
        fontWeight:'bold'
    }

})

export default Header