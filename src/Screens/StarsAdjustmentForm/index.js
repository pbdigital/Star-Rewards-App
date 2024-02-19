import React, {useCallback, useState} from 'react';
import {
  AppTextInput,
  Button,
  RadioButton,
  RewardsToolbar,
  ScreenBackground,
  StarAdjustmentConfirmModal,
  StarAdjustmentConfirmedModal,
  StarPoints,
  Text,
} from '../../Components';
import {COLORS, NAV_ROUTES, STAR_COUNT_MODE} from '../../Constants';
import {starAdjustmentValidationScheme} from '../../FormValidations';
import {useFormik} from 'formik';
import {childActions, childNameSelector, childStarsSelector} from '../../Redux';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Alert, ScrollView} from 'react-native';
import {
  Container,
  FormElementContainer,
  Form,
  RadioButtonContainer,
  RadioButtonSpacer,
  Padded,
  StarAdjustmentButton,
  styles,
} from './styles';

const StarsAdjustmentFormScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const childName = useSelector(childNameSelector);
  const childStarsCount = useSelector(childStarsSelector);
  const [showStarAdjustmentConfirmModal, setShowStarAdjustmentConfirmModal] =
    useState(false);
  const [
    showStarAdjustmentConfirmedModal,
    setShowStarAdjustmentConfirmedModal,
  ] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputLabel, setInputLabel] = useState('Increase Stars By');

  const processForm = useCallback(
    async payload => {
      setIsProcessing(true);
      const {payload: resultPayload} = await dispatch(
        childActions.adjustChildStar(payload),
      );

      if (resultPayload?.success) {
        setShowStarAdjustmentConfirmModal(false);
        setTimeout(() => {
          setShowStarAdjustmentConfirmedModal(true);
        }, 500);
        dispatch(childActions.getAllChildren());
      } else {
        setTimeout(() => {
          Alert.alert(
            'Star Rewards',
            'Unable to process your request. Please try again later.',
          );
        }, 500);
        setShowStarAdjustmentConfirmModal(false);
      }
      setIsProcessing(false);
    },
    [childStarsCount],
  );

  const confirmAdjustment = formData => setShowStarAdjustmentConfirmModal(true);

  const handleOnCloseConfirmedModal = () => {
    setShowStarAdjustmentConfirmedModal(false);
    if (navigation.canGoBack) {
      navigation.goBack();
      return;
    }
    navigation.navigate(NAV_ROUTES.bottomTabNavigator, {
      screens: NAV_ROUTES.settings,
    });
  };

  const handleOnCloseConfirmModal = () =>
    setShowStarAdjustmentConfirmModal(false);

  const {handleSubmit, handleChange, errors, setErrors, values, setValues} =
    useFormik({
      initialValues: {
        selectedMode: STAR_COUNT_MODE.increase,
        starQuantity: '',
        reason: '',
      },
      onSubmit: confirmAdjustment,
      validationSchema: starAdjustmentValidationScheme,
      validateOnChange: false,
    });

  const handleOnInputBoxChanged = () => {
    setErrors({});
  };

  return (
    <ScreenBackground cloudType={0}>
      <RewardsToolbar
        centerTitle
        hideAvatar
        title="Stars Adjustment"
        hideStarPointDisplay
      />
      <ScrollView keyboardShouldPersistTaps="always">
        <Container>
          <Text
            fontSize={16}
            fontWeight="400"
            lineHeight={28}
            textAlign="center"
            color={COLORS.Text.grey}>
            Ready to fine-tune the stars in
            {'\n'}
            {childName}'s sky? Let's make it
            {'\n'}
            happen smoothly.
          </Text>
          <Padded>
            <Text
              fontSize={18}
              fontWeight="600"
              lineHeight={28}
              textAlign="left"
              marginBottom={20}
              color={COLORS.Text.black}>
              Current Star Count
            </Text>
            <StarAdjustmentButton
              onPress={() => {
                navigation.navigate(NAV_ROUTES.starsAdjustmentForm);
              }}>
              <StarPoints mode={null} value={childStarsCount} />
            </StarAdjustmentButton>
          </Padded>
          <Form>
            <FormElementContainer>
              <Text
                fontSize={18}
                fontWeight="500"
                lineHeight={28}
                textAlign="left"
                marginBottom={20}
                color={COLORS.Text.black}>
                Adjustment Mode
              </Text>
              <RadioButtonContainer>
                <RadioButton
                  isSelected={values.selectedMode === STAR_COUNT_MODE.increase}
                  label="Increase"
                  onPress={() => {
                    setValues({
                      ...values,
                      selectedMode: STAR_COUNT_MODE.increase,
                    });
                    setInputLabel('Increase Stars By');
                  }}
                />
                <RadioButtonSpacer />
                <RadioButton
                  isSelected={values.selectedMode === STAR_COUNT_MODE.decrease}
                  label="Decrease"
                  onPress={() => {
                    setValues({
                      ...values,
                      selectedMode: STAR_COUNT_MODE.decrease,
                    });
                    setInputLabel('Decrease Stars By')
                  }}
                />
              </RadioButtonContainer>
              <RadioButton
                isSelected={
                  values.selectedMode === STAR_COUNT_MODE.setTotalValue
                }
                label="Set Total Value"
                onPress={() => {
                  setValues({
                    ...values,
                    selectedMode: STAR_COUNT_MODE.setTotalValue,
                  });
                  setInputLabel('Proposed Star Count');
                }}
                contentContainerStyle={{marginTop: 30}}
              />
            </FormElementContainer>
            <FormElementContainer>
              <Text
                fontSize={18}
                fontWeight="500"
                lineHeight={28}
                textAlign="left"
                color={COLORS.Text.black}>
                {inputLabel}
              </Text>
              <AppTextInput
                placeholder="0"
                onChangeText={handleChange('starQuantity')}
                onChange={handleOnInputBoxChanged}
                errorMessage={errors.starQuantity}
                keyboardType="numeric"
              />
            </FormElementContainer>
            <FormElementContainer>
              <Text
                fontSize={18}
                fontWeight="500"
                lineHeight={28}
                textAlign="left"
                color={COLORS.Text.black}>
                Reason for Adjustment
              </Text>
              <AppTextInput
                placeholder="Write your reason"
                multiline
                style={styles.multilineTextInput}
                returnKeyType="done"
                onChangeText={handleChange('reason')}
                onChange={handleOnInputBoxChanged}
              />
            </FormElementContainer>
          </Form>
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Green}
            shadowColor={COLORS.GreenShadow}
            onPress={handleSubmit}
            marginTop={30}
            title="Save"
            buttonTitleFontSize={16}
            disabled={false}
          />
        </Container>
      </ScrollView>
      <StarAdjustmentConfirmModal
        isVisible={showStarAdjustmentConfirmModal}
        onClose={handleOnCloseConfirmModal}
        onConfirm={processForm}
        adjustmentData={values}
        isProcessing={isProcessing}
      />
      <StarAdjustmentConfirmedModal
        isVisible={showStarAdjustmentConfirmedModal}
        onClose={handleOnCloseConfirmedModal}
      />
    </ScreenBackground>
  );
};

export {StarsAdjustmentFormScreen};
