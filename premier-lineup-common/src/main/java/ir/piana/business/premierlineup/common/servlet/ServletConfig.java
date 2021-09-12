package ir.piana.business.premierlineup.common.servlet;

import org.h2.server.web.WebServlet;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.servlet.ServletContext;

@Configuration
@Profile({"develop", "product" })
public class ServletConfig implements ServletContextInitializer {
    @Override
    public void onStartup(ServletContext servletContext) {
        servletContext.addServlet("H2Console", WebServlet.class)
                .addMapping("/h2/console/*");
//        servletContext.addServlet("captcha", CaptchaServlet.class)
//                .addMapping("/resources/captcha");
    }

//    @Bean
//    public ServletRegistrationBean customServletBean() {
//        ServletRegistrationBean bean = new ServletRegistrationBean(
//                new CaptchaServlet(),
//                "/resources/captcha");
//        return bean;
//    }
}
