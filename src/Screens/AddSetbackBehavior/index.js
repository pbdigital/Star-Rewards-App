/* eslint-disable react-hooks/exhaustive-deps */
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
import {Container, Content, Form} from './styles';
import {isEmpty} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {childIdSelector, childActions} from 'Redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {addSetbacksValidationScheme} from '../../Validations';

const AddSetbackBehaviorScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {setback} = route.params || {};

  const childId = useSelector(childIdSelector);
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = useMemo(() => !!setback, [setback]);
  const toolbarTitle = useMemo(
    () => (isEditing ? 'Update a Set Back' : 'Add a Behavior Set Back'),
    [isEditing],
  );

  const addSetback = useCallback(
    async ({name, stars, emoji}) => {
      console.log({name, stars, emoji, childId});
      const payload = {
        name,
        stars: parseInt(stars, 10),
        emoji,
      };
      setIsLoading(true);
      const {payload: resultPayload} = await dispatch(
        childActions.createChildSetback({childId, payload}),
      );
      setIsLoading(false);
      if (resultPayload?.success) {
        navigation.goBack();
      } else {
        Alert.alert('Unable to add setbacks. Please try again later.');
      }
    },
    [childId],
  );

  const editSetback = useCallback(
    async ({name, stars, emoji}) => {
      console.log({name, stars, emoji, childId, setback});
      const payload = {
        name,
        stars: parseInt(stars, 10),
        emoji,
        id: setback?.id,
      };
      setIsLoading(true);
      const {payload: resultPayload} = await dispatch(
        childActions.updateChildSetback({childId, payload}),
      );
      setIsLoading(false);
      if (resultPayload?.success) {
        navigation.goBack();
      } else {
        Alert.alert('Unable to update setbacks. Please try again later.');
      }
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
      name: '',
      stars: '',
      emoji: '',
    },
    onSubmit: processForm,
    validationSchema: addSetbacksValidationScheme,
    validateOnChange: false,
  });

  useEffect(() => {
    if (setback && isEditing) {
      console.log('Edit', {setback});
      const {name, starsToDeduct, emoji} = setback;
      const options = {shouldValidate: false, shouldTouch: false};
      setValues(
        {
          name,
          stars: starsToDeduct,
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
              onChangeText={handleChange('name')}
              onChange={handleOnInputBoxChanged}
              label="Behavior to Review"
              marginBottom={20}
              errorMessage={errors.name}
              value={values.name}
              placeholder="E.g. 'Interrupting when others are speaking'"
            />
            <AppTextInput
              onChangeText={handleChange('stars')}
              onChange={handleOnInputBoxChanged}
              label="Stars to Deduct"
              marginBottom={20}
              errorMessage={errors.stars}
              keyboardType="numeric"
              value={values.stars ? `${values.stars}` : ''}
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
            disabled={isLoading}
            isLoading={isLoading}
          />
        </Content>
      </Container>
    </ScreenBackground>
  );
};

export {AddSetbackBehaviorScreen};
