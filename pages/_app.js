

import { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import '@assets/self-styles.less';
import "./app.less";
import { Layout, Menu, Space, Typography, Tag } from 'antd';
import Icon, {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faPalette, faMugHot } from '@fortawesome/free-solid-svg-icons';
import themeVariables from '../constants/themeVariables';

import { AuthProvider } from "../middleware/auth.js"

const { Header, Sider, Content } = Layout;
const { CheckableTag } = Tag;
const AntLink = Typography.Link;


const nav1 = { en: "plants", ru: "растения", kr: "식물" }
const nav2 = { en: "paintings", ru: "картинки", kr: "그림" }
const nav3 = { en: "tea", ru: "чай", kr: "차" }



export function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}


export default class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    //const { token } = parseCookies(ctx);
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // Restrict unauthorized user
    if (true) {
      const isProtectedRoute =
        ctx.pathname === "/home";
      if (isProtectedRoute) {
        redirectUser(ctx, "/");
      }
    }
    return { ...pageProps };
  }

  state = {
    collapsed: false,
    language: "en"
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  toggleLanguage = (language) => {
    this.setState({ language });
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <Fragment >
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <title>bowdawn</title>
          <link rel='shortcut icon' href='/seedling-solid.svg' type='image/svg' />

        </Head>



        <Layout >
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ height: "100vh" }}>

            <Link href="/">
              <div className="logo">
                {[...Array(this.state.collapsed ? 3 : 12)].map((e, i) => <FontAwesomeIcon icon={faSeedling} color={themeVariables["@color-primary"]} key={i} />)}
              </div>
            </Link>
            <Menu theme="dark" mode="inline" selectedKeys={[router.pathname]}>
              <Menu.Item key="/plants" icon={<Icon component={() => <FontAwesomeIcon icon={faSeedling} />} />} >
                <Link href="/plants">
                  <a>
                    {nav1[this.state.language]}
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/paintings" icon={<Icon component={() => <FontAwesomeIcon icon={faPalette} />} />} >
                <Link href="/paintings">
                  <a>
                    {nav2[this.state.language]}
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/tea" icon={<Icon component={() => <FontAwesomeIcon icon={faMugHot} />} />} >
                <Link href="/tea">
                  <a>
                    {nav3[this.state.language]}
                  </a>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
              <Space style={{ paddingRight: 24 }}>
                <AntLink onClick={() => this.toggleLanguage("en")} >
                  <CheckableTag checked={this.state.language === "en"} className={this.state.language === "en" ? "" : "ant-tag-green"}>
                    Eng
                  </CheckableTag>
                </AntLink>
                <AntLink onClick={() => this.toggleLanguage("ru")}>
                  <CheckableTag checked={this.state.language === "ru"} className={this.state.language === "ru" ? "" : "ant-tag-green"}>
                    Рус
                  </CheckableTag>
                </AntLink>
                <AntLink onClick={() => this.toggleLanguage("kr")}>
                  <CheckableTag checked={this.state.language === "kr"} className={this.state.language === "kr" ? "" : "ant-tag-green"}>
                    한
                  </CheckableTag>
                </AntLink>
              </Space>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: 24,
                padding: 24,
                minHeight: 280,
              }}
            >


              <AuthProvider>
                <Component {...pageProps}  {...this.state} router={router} />
              </AuthProvider>
            </Content>
          </Layout>
        </Layout>
      </Fragment>
    );


  }


}



