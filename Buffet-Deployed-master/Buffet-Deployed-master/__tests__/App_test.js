import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import Home from '../components/Home'
import Menu from '../components/Menu'
import MenuAppetizer from '../components/MenuAppetizer'
import MenuDessert from '../components/MenuDessert'
import MenuMainCourse from '../components/MenuMainCourse'
import MenuSoups from '../components/MenuSoups'
import AnalyticsSummary from '../components/AnalyticsSummary'
import Insights from '../components/Insights'
import Start from '../components/Start'

jest.useFakeTimers();
// Test App Page
it('App renders without crashing', () => {
const rendered = renderer.create(<App />).toJSON();
expect(rendered).toBeTruthy();
});

it('App test against snapshot', () => {
const tree = renderer.create(<App />).toJSON();
expect(tree).toMatchSnapshot();
});

// Test Home Page
it('Home renders without crashing', () => {
const rendered = renderer.create(<Home />).toJSON();
expect(rendered).toBeTruthy();
});

it('Home test against snapshot', () => {
const tree = renderer.create(<Home />).toJSON();
expect(tree).toMatchSnapshot();
});

// Test Menu Page
it('Menu renders without crashing', () => {
const rendered = renderer.create(<Menu />).toJSON();
expect(rendered).toBeTruthy();
});

it('Menu test against snapshot', () => {
const tree = renderer.create(<Menu />).toJSON();
expect(tree).toMatchSnapshot();
});

// Test MenuAppetizer Page
it('MenuAppetizer renders without crashing', () => {
const rendered = renderer.create(<MenuAppetizer />).toJSON();
expect(rendered).toBeTruthy();
});

it('MenuAppetizer test against snapshot', () => {
const tree = renderer.create(<MenuAppetizer />).toJSON();
expect(tree).toMatchSnapshot();
});

// Test MenuDessert Page
it('MenuDessert renders without crashing', () => {
const rendered = renderer.create(<MenuDessert />).toJSON();
expect(rendered).toBeTruthy();
});

it('MenuDessert test against snapshot', () => {
const tree = renderer.create(<MenuDessert />).toJSON();
expect(tree).toMatchSnapshot();
});

// Test MenuMainCourse Page
it('MenuMainCourse renders without crashing', () => {
const rendered = renderer.create(<MenuMainCourse />).toJSON();
expect(rendered).toBeTruthy();
});

it('MenuMainCourse test against snapshot', () => {
const tree = renderer.create(<MenuMainCourse />).toJSON();
expect(tree).toMatchSnapshot();
});

// Test MenuSoups Page
it('MenuSoups renders without crashing', () => {
const rendered = renderer.create(<MenuSoups />).toJSON();
expect(rendered).toBeTruthy();
});

it('MenuSoups test against snapshot', () => {
const tree = renderer.create(<MenuSoups />).toJSON();
expect(tree).toMatchSnapshot();
});

// Test AnalyticsSummary Page
it('AnalyticsSummary renders without crashing', () => {
const rendered = renderer.create(<AnalyticsSummary />).toJSON();
expect(rendered).toBeTruthy();
});

it('AnalyticsSummary test against snapshot', () => {
const tree = renderer.create(<AnalyticsSummary />).toJSON();
expect(tree).toMatchSnapshot();
});

// Test Insights Page
it('Insights renders without crashing', () => {
const rendered = renderer.create(<Insights />).toJSON();
expect(rendered).toBeTruthy();
});

it('Insights test against snapshot', () => {
const tree = renderer.create(<Insights />).toJSON();
expect(tree).toMatchSnapshot();
});

// Test Start Page
it('Start renders without crashing', () => {
const rendered = renderer.create(<Start />).toJSON();
expect(rendered).toBeTruthy();
});

it('Start test against snapshot', () => {
const tree = renderer.create(<Start />).toJSON();
expect(tree).toMatchSnapshot();
});
