import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseScreen } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStack } from '../navigation';
import { useTheme } from '../theming';
import Animated, { multiply, divide } from 'react-native-reanimated';
import { interpolateColor, useScrollHandler } from 'react-native-redash';
import useDimensions from '../useDimensions';
import { SLIDE_HEIGHT, Slide, PaginationDot, SubSlide } from '../components/Slides';
import { TableKey } from '../models';
import { List } from '../components/Retro';
import { RouteProp } from '@react-navigation/native';
import { useSprints } from '../components/Sprints';

const BORDER_RADIUS = 30;

const slides = [
  {
    key: TableKey.Good,
    subtitle: 'Went well',
    description: 'What was good in recent sprint',
    color: '#019588',
  },
  {
    key: TableKey.Bad,
    subtitle: 'To improve',
    description: 'What was bad in recent sprint',
    color: '#E91E63',
  },
  {
    key: TableKey.Todo,
    subtitle: 'Action items',
    description: 'What we should focus on?',
    color: '#9C28B0',
  },
];

interface SprintScreenProps {
  navigation: StackNavigationProp<RootStack>;
  route: RouteProp<RootStack, 'Sprint'>;
}

const SprintScreen: React.FunctionComponent<SprintScreenProps> = ({ navigation, route }) => {
  const { sprints } = useSprints();
  const { theme } = useTheme();
  const { width } = useDimensions();
  //TODO scrollHandler useScrollHandler?
  const { x, scrollHandler } = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });

  const { sprint } = route.params;

  const scroll = useRef<Animated.ScrollView>(null);

  // const onNextPress = (index: number) => {
  //   if (scroll.current) {
  //     scroll.current.getNode().scrollTo({ x: width * (index + 1), animated: true });
  //   }
  // };

  const onAddPress = (tableKey: TableKey) => {
    navigation.navigate('AddRetroEntry', { tableKey, sprintId: sprint.id });
  };

  const resolveEntries = (tableKey: TableKey) => {
    const _sprint = sprints.find((x) => x.id === sprint.id);
    if (_sprint) {
      switch (tableKey) {
        case TableKey.Good:
          return sprint.good;
        case TableKey.Bad:
          return sprint.bad;
        case TableKey.Todo:
          return sprint.todo;
      }
    } else {
      return [];
    }
  };

  return (
    <BaseScreen>
      <Animated.View
        style={{
          backgroundColor,
          height: SLIDE_HEIGHT,
          borderBottomRightRadius: BORDER_RADIUS,
        }}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}>
          {slides.map(({ key }) => (
            <Slide key={key}>
              <List entries={resolveEntries(key)} tableKey={key} />
            </Slide>
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[{ ...StyleSheet.absoluteFillObject }, { backgroundColor }]} />
        <View
          style={[
            styles.footerContent,
            {
              backgroundColor: theme.colors.background,
              borderTopLeftRadius: BORDER_RADIUS,
            },
          ]}>
          <View style={[styles.pagination, { height: BORDER_RADIUS }]}>
            {slides.map((_, index) => (
              <PaginationDot key={index} index={index} currentIndex={divide(x, width)} />
            ))}
          </View>
          <Animated.View
            style={[
              {
                width: width * slides.length,
                flexDirection: 'row',
              },
              { transform: [{ translateX: multiply(x, -1) }] },
            ]}>
            {slides.map(({ description, subtitle, key }, index) => (
              <SubSlide
                key={index}
                description={description}
                subtitle={subtitle}
                onAddPress={() => onAddPress(key)}
              />
            ))}
          </Animated.View>
        </View>
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  footer: { flex: 1 },
  footerContent: {
    flex: 1,
    flexDirection: 'row',
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default SprintScreen;
