import React, { useEffect, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../utils/Colors';
import { addCompareItem, checkContains, getClickedCount, getResponsiveSize } from '../utils/CommonFunctions';
import { APP_PADDING_HOR_VAL } from '../utils/Globals';

import { onPressCardItem } from '../redux/actions/mainAction';
import { bindActionCreators } from 'redux';

const CardItem = (props) => {
    const [rotateVal] = useState(new Animated.Value(0));

    const [isDisabled, setIsDisabled] = useState(false);
    const [isShowFace, setIsShowFace] = useState(false);

    useEffect(() => {
        if (props.showFace) {
            setIsShowFace(false);
            Animated.timing(rotateVal, {
                toValue: 0.5,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => {
                setIsShowFace(true);
                Animated.timing(rotateVal, {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true
                }).start(() => {
                    setIsDisabled(false);
                })
            })
        } else {
            setIsShowFace(true);

            Animated.timing(rotateVal, {
                toValue: 0.5,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => {
                setIsShowFace(false);
                Animated.timing(rotateVal, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true
                }).start(() => {
                    setIsDisabled(false);
                });
            })
        }

    }, [props.showFace]);

    const onPressCardItem = () => {

        if (checkContains(props.row, props.com)) {
            return;
        }

        setIsDisabled(true);

        let clickedCount = getClickedCount();

        addCompareItem({ row: props.row, col: props.col, number: props.number, clickedCount });
        props.onPressCardItem(props.row, props.col);
    }

    return (
        <Animated.View style={[styles.container, {
            transform: [{
                rotateY: rotateVal.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg']
                }),
            }]
        }]}>
            <TouchableOpacity
                disabled={props.loading || isDisabled || props.showFace}
                onPress={() => onPressCardItem(props.row, props.col)}
                style={[styles.subContainer, isShowFace ? styles.faceContainer : styles.backContainer]}>
                {
                    isShowFace ?
                        <Text style={{
                            fontSize: getResponsiveSize(26), color: '#444',
                            transform: [{
                                rotateY: '180deg'
                            }]
                        }}>{props.number}</Text>
                        : <Text style={{ fontSize: getResponsiveSize(36), color: Colors.WHITE }}>?</Text>
                }
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    subContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: getResponsiveSize(10),
    },

    faceContainer: {
        backgroundColor: Colors.WHITE
    },
    backContainer: {
        backgroundColor: Colors.CARD_BACK_COLOR,
        borderWidth: 4,
        borderColor: Colors.WHITE
    },
    headerContainer: {
        paddingHorizontal: getResponsiveSize(APP_PADDING_HOR_VAL)
    },
    cardContainer: {
        flex: 1,
        paddingVertical: getResponsiveSize(10),
        paddingHorizontal: getResponsiveSize(APP_PADDING_HOR_VAL)
    },
    cardItemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: getResponsiveSize(6)
    }
});

const mapStateToProps = state => ({
    loading: state.main.loading
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ onPressCardItem }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);