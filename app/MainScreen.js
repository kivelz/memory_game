import React, { useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardItem from './components/CardItem';
import Colors from './utils/Colors';
import { getResponsiveSize } from './utils/CommonFunctions';
import CommonStyles from './utils/CommonStyles';
import { APP_PADDING_HOR_VAL } from './utils/Globals';
import { onGenerateNumbers, onRestartGame, onSetCheckedInfo } from './redux/actions/mainAction';

const MainScreen = (props) => {
    const count = useSelector(state => state.main.count);
    const cardItems = useSelector(state => state.main.cardItems);
    const loading = useSelector(state => state.main.loading);
    const isEnded = useSelector(state => state.main.isEnded);
    const dispatch = useDispatch();
   
    useEffect(() => {
        onPressRestart();
    }, []);

    useEffect(() => {
        if (isEnded) {
            showAlert(count);
        }
    }, [isEnded])

    const showAlert = (totalCount) => {
        Alert.alert(
            "Congratulations!",
            `You win this game by ${totalCount} steps!`,
            [
                {
                    text: "Try another round",
                    onPress: () => onPressRestart()
                }
            ]
        )
    }

    const onPressRestart = () => {
        dispatch(onRestartGame());
    }

    const getPaddingVertical = (row_index) => {
        let paddingTop = 0;
        let paddingBottom = 0;

        if (row_index === 0) {
            paddingBottom = 6.75;
        } else if (row_index === 1) {
            paddingTop = 2.25;
            paddingBottom = 4.5;
        } else if (row_index === 2) {
            paddingTop = 4.5;
            paddingBottom = 2.25;
        }
        else {
            paddingTop = 6.75;
            paddingBottom = 0;
        }

        return {
            paddingTop,
            paddingBottom
        }
    }

    const getPaddingHorizontal = (col_index) => {
        let paddingLeft = 0;
        let paddingRight = 0;

        if (col_index === 0) {
            paddingRight = 6;
        } else if (col_index === 2) {
            paddingLeft = 6;
        } else {
            paddingLeft = 3;
            paddingRight = 3;
        }

        return {
            paddingLeft,
            paddingRight
        }
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[CommonStyles.flex_row_center, styles.headerContainer]}>
                <TouchableOpacity disabled={loading} onPress={() => onPressRestart()}>
                    <Text style={{ color: Colors.WHITE, fontSize: getResponsiveSize(20) }}>Restart</Text>
                </TouchableOpacity>
                <View style={[CommonStyles.flex_row_center, { flex: 1, justifyContent: 'flex-end' }]}>
                    <Text style={{ color: Colors.WHITE, fontSize: getResponsiveSize(26) }}>STEPS: </Text>
                    <Text style={{ color: Colors.COUNT_COLOR, fontSize: getResponsiveSize(26) }}>{count}</Text>
                </View>
            </View>
            <View style={[styles.cardContainer]}>
                {
                    cardItems.map((subList, row) => {
                        const { paddingTop, paddingBottom } = getPaddingVertical(row);
                        return (
                            <View key={row} style={[CommonStyles.flex_row_center, { flex: 1, paddingTop, paddingBottom }]}>
                                {
                                    subList.map((item, col) => {
                                        const { paddingLeft, paddingRight } = getPaddingHorizontal(col);
                                        return (
                                            <View key={col} style={[styles.cardItemContainer, { paddingLeft, paddingRight }]}>
                                                <CardItem {...item} row={row} col={col} />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )

                    })
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND_COLOR,
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
    }
});

export default MainScreen;