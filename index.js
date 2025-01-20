import { default as parseMarkdown } from "front-matter-markdown";
import { readFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);

function readFrontMatterValues(path) {
    return new Promise(function (resolve) {
        readFileAsync(path, "utf8")
            .then((mdString) => parseMarkdown(mdString))
            .then((mdTree) => {
                if(!mdTree.title && !mdTree.date) {
                    throw new Error("Front matter missing title and date");
                }

                return mdTree;
            })
            .then((mdTree) => resolve({
                title: mdTree.title,
                date: mdTree.date,
                tags: mdTree.tags,
                description: mdTree.description,
                path: path,
            }))
            .catch((error) => resolve({
                error: error.message,
                path: path
             }));
    });
}

export function readFrontMatterValuesFromPaths(paths) {
    return Promise.all(paths.map(readFrontMatterValues));
}
