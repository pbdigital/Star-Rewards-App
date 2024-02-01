import React, {useState} from 'react';
import {
  AppTextInput,
  Button,
  RewardsToolbar,
  ScreenBackground,
  StarAdjustmentConfirmModal,
  StarAdjustmentConfirmedModal,
  Text,
} from '../../Components';
import {
  Container,
  FormElementContainer,
  Form,
  RadioButtonContainer,
  DotActive,
  RadioButtonRoot,
  DotInActive,
  RadioButtonSpacer,
} from './styles';
import {COLORS, NAV_ROUTES, STAR_COUNT_MODE} from '../../Constants';
import {starAdjustmentValidationScheme} from '../../FormValidations';
import {useFormik} from 'formik';
import {childActions, childNameSelector} from '../../Redux';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const RadioButton = ({isSelected, label, onPress}) => {
  return (
    <RadioButtonRoot onPress={onPress}>
      {isSelected ? <DotActive /> : <DotInActive />}
      <Text
        fontSize={16}
        fontWeight="400"
        textAlign="center"
        marginLeft={16}
        color={COLORS.Text.grey}>
        {label}
      </Text>
    </RadioButtonRoot>
  );
};

const StarsAdjustmentFormScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const childName = useSelector(childNameSelector);
  const [showStarAdjustmentConfirmModal, setShowStarAdjustmentConfirmModal] =
    useState(false);
  const [
    showStarAdjustmentConfirmedModal,
    setShowStarAdjustmentConfirmedModal,
  ] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processForm = async payload => {
    setIsProcessing(true);
    const {payload: resultPayload} = await dispatch(
      childActions.adjustChildStar(payload),
    );
    if (resultPayload?.success) {
      setShowStarAdjustmentConfirmModal(false);
      setTimeout(() => {
        setShowStarAdjustmentConfirmedModal(true);
      }, 500);
    }
    setIsProcessing(false);
  };

  const confirmAdjustment = formData => setShowStarAdjustmentConfirmModal(true);

  const {
    handleSubmit,
    handleChange,
    errors,
    setErrors,
    values,
    setValues,
    touched,
    resetForm,
  } = useFormik({
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
                onPress={() =>
                  setValues({
                    ...values,
                    selectedMode: STAR_COUNT_MODE.increase,
                  })
                }
              />
              <RadioButtonSpacer />
              <RadioButton
                isSelected={values.selectedMode === STAR_COUNT_MODE.decrease}
                label="Decrease"
                onPress={() =>
                  setValues({
                    ...values,
                    selectedMode: STAR_COUNT_MODE.decrease,
                  })
                }
              />
            </RadioButtonContainer>
          </FormElementContainer>
          <FormElementContainer>
            <Text
              fontSize={18}
              fontWeight="500"
              lineHeight={28}
              textAlign="left"
              color={COLORS.Text.black}>
              Star Quantity
            </Text>
            <AppTextInput
              placeholder="0"
              onChangeText={handleChange('starQuantity')}
              onChange={handleOnInputBoxChanged}
              errorMessage={errors.starQuantity}
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
              style={{minHeight: 150}}
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
          title="Save"
          buttonTitleFontSize={16}
          disabled={false}
        />
      </Container>
      <StarAdjustmentConfirmModal
        isVisible={showStarAdjustmentConfirmModal}
        onClose={() => setShowStarAdjustmentConfirmModal(false)}
        onConfirm={processForm}
        adjustmentData={values}
        isProcessing={isProcessing}
      />
      <StarAdjustmentConfirmedModal
        isVisible={showStarAdjustmentConfirmedModal}
        onClose={justModal => {
          setShowStarAdjustmentConfirmedModal(false);
          if (!justModal) return;
          if (navigation.canGoBack) {
            navigation.goBack();
          } else {
            navigation.navigate(NAV_ROUTES.bottomTabNavigator, {
              screens: NAV_ROUTES.settings,
            });
          }
        }}
      />
    </ScreenBackground>
  );
};

export {StarsAdjustmentFormScreen};
