import React, {useRef, useState, useCallback} from 'react';
import {AppTextInput} from '../AppTextInput';
import {ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Text} from '../Text';
import {COLORS, DEFAULT_TASKS} from 'Constants';

const TaskSelector = ({onChangeText, errorMessage, value}) => {
  const refTaskName = useRef(null);
  const [isInputActive, setIsInputActive] = useState(false);

  const renderDefaultTaskSelector = useCallback(() => {
    return (
      <View style={styles.selectorRoot}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{paddingHorizontal: 20}}>
            <Text fontSize={14} fontWeight="400" color={COLORS.Text.lightGrey}>
              POPULAR TASKS
            </Text>
            <View>
              {DEFAULT_TASKS.map((task, index) => {
                const isLastItem = DEFAULT_TASKS.length - 1 === index;
                return (
                  <TouchableOpacity
                    style={!isLastItem && styles.listBorder}
                    onPress={() => {
                      onChangeText && onChangeText(task);
                      refTaskName?.current?.blur();
                    }}>
                    <Text
                      fontSize={16}
                      fontWeight="400"
                      color={COLORS.Text.grey}
                      marginTop={10}
                      marginBottom={!isLastItem && 10}>
                      {task}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }, []);

  return (
    <View style={styles.root}>
      <AppTextInput
        label="Task Name"
        marginBottom={30}
        onChangeText={onChangeText}
        errorMessage={errorMessage}
        value={value}
        onBlur={() => setIsInputActive(false)}
        onFocus={() => setIsInputActive(true)}
        ref={refTaskName}
      />
      {isInputActive && renderDefaultTaskSelector()}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    position: 'relative',
    zIndex: 1
  },
  selectorRoot: {
    borderRadius: 16,
    paddingVertical: 20,
    backgroundColor: 'white',
    maxHeight: 270,
    width: '100%',

    position: 'absolute',
    top: 100,
    left: 0,

    shadowColor: 'rgba(128, 181, 240, 0.50)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,

    elevation: 5,
  },
  listBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Grey,
  },
});

export {TaskSelector};
