import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {Alert} from 'react-native';
import {useFormik} from 'formik';
import {
  Button,
  ScreenBackground,
  Toolbar,
  EmojiPicker,
  AppTextInput,
} from 'Components';
import {COLORS} from 'Constants';
import {addRewardValidationScheme} from 'FormValidations';
import {Container, Content, Form} from './styles';
import {isEmpty} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {childIdSelector, childActions} from 'Redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NAV_ROUTES} from 'Constants';

const AddSetbackBehaviorScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {setback} = route.params || {};

  const childId = useSelector(childIdSelector);
  const [isLoading, setIsLoading] = useState(false);

  console.log({setback})

  const isEditing = useMemo(() => !!setback, [setback]);
  const toolbarTitle = useMemo(
    () => (isEditing ? 'Update A Setback Behavior' : 'Add A Setback Behavior'),
    [isEditing],
  );

  const addSetback = useCallback(
    async ({behavior, starsToDeduct, emoji}) => {
      navigation.goBack();
    },
    [childId],
  );

  const editSetback = useCallback(
    async ({behavior, starsToDeduct, emoji}) => {
      navigation.goBack();
    },
    [childId, setback],
  );

  const processForm = useCallback(
    async formData => {
      isEditing ? editSetback(formData) : addSetback(formData);
    },
    [editSetback, addSetback, isEditing],
  );

  const {
    handleSubmit,
    handleChange,
    errors,
    setErrors,
    values,
    setValues,
    touched,
  } = useFormik({
    initialValues: {
      behavior: '',
      starsToDeduct: '',
      emoji: '',
    },
    onSubmit: processForm,
    validationSchema: addRewardValidationScheme,
    validateOnChange: false,
  });

  useEffect(() => {
    if (setback && isEditing) {
      console.log('Edit', {setback});
      const {behavior, starsToDeduct, emoji} = setback;
      const options = {shouldValidate: false, shouldTouch: false};
      setValues(
        {
          behavior,
          starsToDeduct,
          emoji,
        },
        options,
      );
    }
  }, [setback, isEditing, setValues]);

  const handleOnInputBoxChanged = () => {
    setErrors({});
  };

  return (
    <ScreenBackground cloudType={0}>
      <Container>
        <Toolbar title={toolbarTitle} titleFontSize={20} />
        <Content>
          <EmojiPicker
            value={values.emoji}
            onEmojiSelected={handleChange('emoji')}
            onEmojiChange={emoji => setErrors({})}
            hasError={touched && !isEmpty(errors.emoji)}
          />
          <Form>
            <AppTextInput
              onChangeText={handleChange('behavior')}
              onChange={handleOnInputBoxChanged}
              label="Behavior"
              marginBottom={20}
              errorMessage={errors.behavior}
              value={values.behavior}
            />
            <AppTextInput
              onChangeText={handleChange('starsToDeduct')}
              onChange={handleOnInputBoxChanged}
              label="Star to deduct"
              marginBottom={20}
              errorMessage={errors.starsToDeduct}
              keyboardType="numeric"
              value={values.starsToDeduct ? `${values.starsToDeduct}` : ''}
            />
          </Form>
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Green}
            shadowColor={COLORS.GreenShadow}
            onPress={handleSubmit}
            title="Save"
            buttonTitleFontSize={16}
            // disabled={isLoading}
            disabled={true}
            isLoading={isLoading}
          />
        </Content>
      </Container>
    </ScreenBackground>
  );
};

export {AddSetbackBehaviorScreen};
