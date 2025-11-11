import { Link } from 'expo-router'
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'

const App = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/1200x/a1/99/89/a19989a372ed5593c44c09b8241d00f8.jpg', // Replace with your actual background image URL
      }}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.container}>
        <Image
          alt="App Logo"
          resizeMode="contain"
          style={styles.headerImg}
          source={{
            uri: 'https://scontent.fmnl17-6.fna.fbcdn.net/v/t1.15752-9/542009147_764160926408947_8654842669446252397_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_ohc=1LA14WUL2bgQ7kNvwFwFlzS&_nc_oc=AdkyrtHw14d1JqV-Sfv7qgk_tlT_K84IFHD1Hsn4TnMIzUwLz46WRwEujuCkYDA-yKU&_nc_zt=23&_nc_ht=scontent.fmnl17-6.fna&oh=03_Q7cD3wGITjkEzUUXDCtYx4E_57rZszoC_bkEXJGgoUfGDgcbPA&oe=6934E5AE',
          }}
        />

        <Link href="/Adminlogin" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Administrator</Text>
          </Pressable>
        </Link>
        <Link href="/Instructorlogin" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Instructor</Text>
          </Pressable>
        </Link>
        <Link href="/ProgChairlogin" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Program Chairperson</Text>
          </Pressable>
        </Link>
      </View>
    </ImageBackground>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    padding: 20,
  },
  contentOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(119, 119, 118, 0.3)',
  },
  headerImg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 100, // circle
  },
  button: {
    height: 50,
    width: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 119, 255, 0.85)',
    padding: 14,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'League Spartan',
  },
})
