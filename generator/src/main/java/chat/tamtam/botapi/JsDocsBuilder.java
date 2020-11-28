package chat.tamtam.botapi;

import java.util.regex.Pattern;

import org.openapitools.codegen.CodegenModel;
import org.openapitools.codegen.CodegenOperation;
import org.openapitools.codegen.CodegenProperty;

/**
 * @author <a href="mailto:vadim.yelisseyev@gmail.com">Vadim Yelisseyev</a>
 */
public class JsDocsBuilder {
    private static final Pattern LINKS_PATTERN = Pattern.compile("(.*)(\\[.+?]\\(#operation/(\\S+?)\\))(.*)");

    public static String of(CodegenOperation operation) {
        final StringBuilder builder = new StringBuilder();

        addStart(builder);

        if (operation.unescapedNotes != null) {
            addDescription(builder, operation.unescapedNotes);
            builder.append(" *\n");
        }

        builder.append(" * @summary ").append(operation.summary);

        addEnd(builder);

        return builder.toString();
    }

    public static String of(CodegenModel model) {
        return buildDocWithDescriptionOnly(model.unescapedDescription);
    }

    public static String of(CodegenProperty property) {
        return buildDocWithDescriptionOnly(property.unescapedDescription);
    }

    private static String buildDocWithDescriptionOnly(String description) {
        final StringBuilder builder = new StringBuilder();

        if (description != null) {
            addStart(builder);
            addDescription(builder, description);
            addEnd(builder);
        }

        return builder.toString();
    }

    private static void addStart(StringBuilder builder) {
        builder.append("/**\n");
    }

    private static void addEnd(StringBuilder builder) {
        if (builder.charAt(builder.length() - 1) != '\n') {
            builder.append("\n");
        }
        builder.append(" */");
    }

    private static void addDescription(StringBuilder builder, String description) {
        if (description.contains("\n")) {
            for (String line : description.split("\n")) {
                addLine(builder, line);
            }
        } else {
            addLine(builder, description);
        }
    }

    private static void addLine(StringBuilder builder, String line) {
        if (line.contains(". ") && !isEnumeration(line)) {
            for (String sentence : line.split("\\. ")) {
                addLine(builder, sentence);
            }
            return;
        }

        builder.append(" * ").append(format(line)).append("\n");
    }

    private static String format(String line) {
        line = removePointFromEOL(line);
        line = replaceLinks(line);
        return line;
    }

    private static String removePointFromEOL(String line) {
        return line.endsWith(".") ? line.substring(0, line.length() - 1) : line;
    }

    private static String replaceLinks(String line) {
        if (line.contains("#operation")) {
            return LINKS_PATTERN.matcher(line).replaceAll("$1[$3]{@link TamTamBotAPI#$3}$4");
        }
        return line;
    }

    private static boolean isEnumeration(String line) {
        return line.startsWith(" - ") || line.matches("(\\s?[0-9]\\.\\s+?\\S)(.*)");
    }
}
