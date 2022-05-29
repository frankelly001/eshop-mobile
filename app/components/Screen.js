import React, {useRef} from 'react';
import {SafeAreaView, ScrollView, children, useColorScheme} from 'react-native';
import AppButton from './AppButton';

const Screen = ({children, scrollView}) => {
  //   const isDarkMode = useColorScheme() === 'dark';

  //   const backgroundStyle = {
  //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //   };

  //   goToTop = () => {
  //     this.scroll.scrollTo({x: 0, y: 0, animated: true});
  //  }
  //  render() {
  //   return (
  //    <ScrollView
  //      ref={(c) => {this.scroll = c}}
  //    >
  //      // [rest of your code here...]
  //      <Button title='Go To Top' onPress={this.goToTop} />
  //    </ScrollView>
  //   )
  //  }

  // const scrollView = useRef();

  // const goToTop = () => {
  //   console.log(scrollView, 'i am scroll view');
  //   scrollView.current.scrollTo({x: 0, y: 0, animated: true});
  //   // scrollView.scrollTo({x: 0, y: 0, animated: true});
  // };

  return (
    <SafeAreaView>
      {/* <StatusBar /> */}
      <ScrollView
        ref={scrollView}
        showsVerticalScrollIndicator={false}
        // onContentSizeChange={() =>
        //   scrollView.current.scrollTo({x: 0, y: 0, animated: true})
        // }
        contentInsetAdjustmentBehavior="automatic">
        {children}
        {/* <AppButton label="Go To Top" onPress={goToTop} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Screen;
